describe("powershell conservative indentation", () => {
  let editor;
  beforeEach(async () => {
    editor = null;
    jasmine.useRealClock();
    await lumine.packages.activatePackage("language-powershell");
  });
  afterEach(() => editor?.destroy());
  async function start(file, text) {
    if (!editor || !editor.getPath()?.endsWith(file)) {
      editor?.destroy();
      editor = await lumine.workspace.open(file);
    }
    editor.update({ autoIndent: true, tabLength: 2, softTabs: true });
    editor.setText(text);
    expect(await editor.whenGrammarSettled()).toBe(true);
  }
  describe("ps1", () => {
    it("indents Enter inside a block", async () => {
      await start("indentation.ps1", "function Test {\n}");
      editor.setCursorBufferPosition([0, Infinity]);
      await editor.insertNewline();
      expect(editor.lineTextForBufferRow(1)).toBe("  ");
    });
    it("dedents a typed closing brace", async () => {
      await start("indentation.ps1", 'function Test {\n  Write-Output "hi"\n  ');
      editor.setCursorBufferPosition([2, Infinity]);
      await editor.insertText("}", { autoIndent: true, autoDecreaseIndent: true });
      await editor.whenGrammarSettled();
      expect(editor.lineTextForBufferRow(2)).toBe("}");
    });
    it("reindents a body and its closing delimiter once", async () => {
      await start("indentation.ps1", 'function Test {\nWrite-Output "hi"\n}');
      await editor.autoIndentBufferRows(0, 2);
      expect(editor.getText()).toBe('function Test {\n  Write-Output "hi"\n}');
    });
    it("does not add indent after a complete one-line block or delimiters in a comment", async () => {
      for (const text of ['function Test { Write-Output "hi" }', "# { [ ("]) {
        await start("indentation.ps1", text);
        editor.moveToEndOfLine();
        await editor.insertNewline();
        expect(editor.lineTextForBufferRow(1)).toBe("");
      }
    });
    it("preserves multiline literal whitespace during reindent", async () => {
      const source = "$value = @'\n      { [ (\n  last\n'@";
      await start("indentation.ps1", source);
      await editor.autoIndentBufferRows(0, editor.getLastBufferRow());
      expect(editor.getText()).toBe(source);
    });
    it("preserves multiline comment interiors during reindent", async () => {
      const source = "<# first\n      { [ (\n  last #>";
      await start("indentation.ps1", source);
      await editor.autoIndentBufferRows(0, editor.getLastBufferRow());
      expect(editor.getText()).toBe(source);
    });
  });
});

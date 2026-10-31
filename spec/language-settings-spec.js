describe("powershell editing settings", () => {
  let editor;
  beforeEach(async () => {
    jasmine.useRealClock();
    editor = null;
    await lumine.packages.activatePackage("language-powershell");
  });
  afterEach(() => editor?.destroy());
  async function start(scope, text = "value") {
    editor ??= await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName(scope));
    editor.setText(text);
    expect(await editor.whenGrammarSettled()).toBe(true);
    editor.update({ autoIndent: false });
  }
  for (const [scope, line, block] of [["source.powershell", "#", ["<#", "#>"]]]) {
    it("exposes line and block comment metadata in " + scope, async () => {
      await start(scope);
      expect(await editor.getCommentDelimitersForBufferPosition([0, 0])).toEqual({ line, block });
      await editor.toggleLineCommentsForBufferRows(0, 0);
      expect(editor.getText()).toBe(line + " value");
      await editor.toggleLineCommentsForBufferRows(0, 0);
      expect(editor.getText()).toBe("value");
    });
    it("round trips block comments using the advertised delimiters in " + scope, async () => {
      await start(scope);
      const { block } = await editor.getCommentDelimitersForBufferPosition([0, 0]);
      const options = {
        commentStrings: { commentStartString: block[0], commentEndString: block[1] },
      };
      await editor.toggleLineCommentsForBufferRows(0, 0, options);
      expect(editor.getText()).toBe(block[0] + " value " + block[1]);
      await editor.toggleLineCommentsForBufferRows(0, 0, options);
      expect(editor.getText()).toBe("value");
    });
  }
  it("keeps language identifier characters inside word selection", async () => {
    for (const [scope, text, column, expected] of [
      ["source.powershell", "Get-ChildItem", 5, "Get-ChildItem"],
      ["source.powershell", "-LiteralPath", 5, "-LiteralPath"],
    ]) {
      await start(scope, text);
      editor.setCursorBufferPosition([0, column]);
      expect(editor.getWordUnderCursor())
        .withContext(scope + " " + text)
        .toBe(expected);
    }
  });
  it("selects executable PowerShell scripts without requiring a final newline", () => {
    for (const text of [
      "#!/usr/bin/pwsh",
      "#!/usr/bin/env pwsh",
      "#!/usr/bin/env -S pwsh -NoProfile",
      "#!/usr/bin/env powershell\r\n",
      "#!/usr/bin/pwsh.exe",
      "#!/usr/bin/env powershell.exe",
      "#!/usr/bin/env.exe -S pwsh.exe -NoProfile",
    ])
      expect(lumine.grammars.selectGrammar("script", text).scopeName).toBe("source.powershell");
    for (const text of [
      "#!/usr/bin/env pwsh-tool",
      "#!/usr/bin/pwsh.exe-wrapper",
      "#!/usr/bin/env.exe -S bash -c pwsh.exe",
      "#!/usr/bin/env bash -c pwsh",
    ])
      expect(lumine.grammars.selectGrammar("script", text).scopeName).not.toBe("source.powershell");
    expect(
      lumine.grammars.selectGrammar("Custom.Format.ps1xml", "<Configuration/>").scopeName,
    ).not.toBe("source.powershell");
  });
});

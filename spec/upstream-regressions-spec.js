describe("PowerShell upstream syntax and folding regressions", () => {
  let editor;

  beforeEach(async () => {
    await lumine.packages.activatePackage("language-powershell");
    editor = await lumine.workspace.open();
    editor.setGrammar(lumine.grammars.grammarForScopeName("source.powershell"));
  });

  afterEach(() => editor?.destroy());

  for (const [name, text] of [
    ["region", "#region Utilities\nGet-ChildItem .\n#endregion\n"],
    ["signature", "# SIG # Begin signature block\n# SignatureData\n# SIG # End signature block\n"],
    ["help", "<#\n.SYNOPSIS\nExample help\n#>\nGet-ChildItem .\n"],
  ]) {
    it(`folds a ${name} comment block`, async () => {
      editor.setText(text);
      expect(await editor.whenGrammarSettled()).toBe(true);
      editor.foldBufferRow(0);
      expect(editor.isFoldedAtBufferRow(0)).toBe(true);
    });
  }

  for (const text of [
    "git log -- foo.txt\n",
    "tar -xf -\n",
    "tool --output=file -A5 first,second &\n",
  ]) {
    it(`parses native arguments in ${text.trim()}`, async () => {
      editor.setText(text);
      expect(await editor.whenGrammarSettled()).toBe(true);
      const root = editor.getSyntaxNodeAtBufferPosition([0, 0], (node) => !node.parent);
      expect(root.hasError).toBe(false);
      expect(root.descendantsOfType("command").length).toBe(1);
      if (text.includes("&")) {
        expect(root.descendantsOfType("background_operator").length).toBe(1);
      }
    });
  }
});

describe("PowerShell upstream folding regressions", () => {
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
});

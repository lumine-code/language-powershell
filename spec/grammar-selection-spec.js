describe("PowerShell grammar selection", () => {
  beforeEach(async () => {
    await lumine.packages.activatePackage("language-powershell");
  });

  it("selects executable scripts and PowerShell data formats", () => {
    for (const extension of ["ps1", "psm1", "psd1", "pssc", "psrc"])
      expect(
        lumine.grammars.selectGrammar(`sample.${extension}`, "@{ Name = 'sample' }").scopeName,
      ).toBe("source.powershell");
  });

  it("leaves XML formatting and type definitions to the XML grammar", () => {
    const grammar = lumine.grammars.grammarForScopeName("source.powershell");
    expect(grammar.fileTypes).not.toContain("ps1xml");
    expect(
      lumine.grammars.selectGrammar("Custom.Format.ps1xml", "<Configuration/>").scopeName,
    ).not.toBe("source.powershell");
  });
});

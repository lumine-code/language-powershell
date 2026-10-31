; PowerShell brackets everything, so the delimiters carry the indent.
[
  "{"
  "("
  "@{"
  "@("
] @indent

[
  "}"
  ")"
] @dedent

; Reindent code without rewriting whitespace that belongs to multiline text.
([(expandable_here_string_literal) (string_literal) (comment)] @preserve
  (#is? indent.reindent true)
  (#is-not? indent.matchesCurrentRow startPosition)
  (#set! indent.force true))

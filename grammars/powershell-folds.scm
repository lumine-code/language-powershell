[
  (expandable_here_string_literal)
  (verbatim_here_string_characters)
  (function_statement)
  (param_block)
  (script_block_expression)
  (statement_block)
  (switch_body)
  (array_expression)
  (hash_literal_expression)
  (class_statement)
  (class_method_definition)
] @fold

((comment) @fold
  (#match? @fold "^<#")
  (#set! fold.endAt endPosition))

((comment) @fold.start
  (#match? @fold.start "^#region\\b"))
((comment) @fold.end
  (#match? @fold.end "^#endregion\\b"))

((comment) @fold.start
  (#match? @fold.start "^#\\s*SIG\\s+#\\s*Begin\\s+signature\\s+block\\b"))
((comment) @fold.end
  (#match? @fold.end "^#\\s*SIG\\s+#\\s*End\\s+signature\\s+block\\b"))

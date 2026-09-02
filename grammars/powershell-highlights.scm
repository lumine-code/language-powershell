"param" @keyword.control.powershell
"dynamicparam" @keyword.control.powershell
"begin" @keyword.control.powershell
"process" @keyword.control.powershell
"end" @keyword.control.powershell
"if" @keyword.control.conditional.powershell
"elseif" @keyword.control.conditional.powershell
"else" @keyword.control.conditional.powershell
"switch" @keyword.control.conditional.powershell
"foreach" @keyword.control.loop.powershell
"for" @keyword.control.loop.powershell
"while" @keyword.control.loop.powershell
"do" @keyword.control.loop.powershell
"until" @keyword.control.loop.powershell
"function" @storage.type.function.powershell
"filter" @storage.type.function.powershell
"workflow" @keyword.control.powershell
"break" @keyword.control.powershell
"continue" @keyword.control.powershell
"throw" @keyword.control.powershell
"return" @keyword.control.powershell
"exit" @keyword.control.powershell
"trap" @keyword.control.powershell
"try" @keyword.control.powershell
"catch" @keyword.control.powershell
"finally" @keyword.control.powershell
"data" @keyword.control.powershell
"inlinescript" @keyword.control.powershell
"parallel" @keyword.control.powershell
"sequence" @keyword.control.powershell

"-as" @keyword.operator.powershell
"-ccontains" @keyword.operator.powershell
"-ceq" @keyword.operator.powershell
"-cge" @keyword.operator.powershell
"-cgt" @keyword.operator.powershell
"-cle" @keyword.operator.powershell
"-clike" @keyword.operator.powershell
"-clt" @keyword.operator.powershell
"-cmatch" @keyword.operator.powershell
"-cne" @keyword.operator.powershell
"-cnotcontains" @keyword.operator.powershell
"-cnotlike" @keyword.operator.powershell
"-cnotmatch" @keyword.operator.powershell
"-contains" @keyword.operator.powershell
"-creplace" @keyword.operator.powershell
"-csplit" @keyword.operator.powershell
"-eq" @keyword.operator.powershell
"-ge" @keyword.operator.powershell
"-gt" @keyword.operator.powershell
"-icontains" @keyword.operator.powershell
"-ieq" @keyword.operator.powershell
"-ige" @keyword.operator.powershell
"-igt" @keyword.operator.powershell
"-ile" @keyword.operator.powershell
"-ilike" @keyword.operator.powershell
"-ilt" @keyword.operator.powershell
"-imatch" @keyword.operator.powershell
"-in" @keyword.operator.powershell
"-ine" @keyword.operator.powershell
"-inotcontains" @keyword.operator.powershell
"-inotlike" @keyword.operator.powershell
"-inotmatch" @keyword.operator.powershell
"-ireplace" @keyword.operator.powershell
"-is" @keyword.operator.powershell
"-isnot" @keyword.operator.powershell
"-isplit" @keyword.operator.powershell
"-join" @keyword.operator.powershell
"-le" @keyword.operator.powershell
"-like" @keyword.operator.powershell
"-lt" @keyword.operator.powershell
"-match" @keyword.operator.powershell
"-ne" @keyword.operator.powershell
"-notcontains" @keyword.operator.powershell
"-notin" @keyword.operator.powershell
"-notlike" @keyword.operator.powershell
"-notmatch" @keyword.operator.powershell
"-replace" @keyword.operator.powershell
"-shl" @keyword.operator.powershell
"-shr" @keyword.operator.powershell
"-split" @keyword.operator.powershell
"-and" @keyword.operator.powershell
"-or" @keyword.operator.powershell
"-xor" @keyword.operator.powershell
"-band" @keyword.operator.powershell
"-bor" @keyword.operator.powershell
"-bxor" @keyword.operator.powershell
"+" @keyword.operator.powershell
"-" @keyword.operator.powershell
"/" @keyword.operator.powershell
"\\" @keyword.operator.powershell
"%" @keyword.operator.powershell
"*" @keyword.operator.powershell
".." @keyword.operator.powershell
"-not" @keyword.operator.powershell

";" @punctuation.terminator.statement.powershell

(string_literal) @string.quoted.double.powershell

(integer_literal) @constant.numeric.powershell
(real_literal) @constant.numeric.powershell

(command
  command_name: (command_name) @entity.name.function.powershell)

(function_statement
  (function_name) @entity.name.function.powershell)

(invokation_expression
  (member_name) @entity.name.function.powershell)

(member_access
  (member_name) @variable.other.member.powershell)

(command_invokation_operator) @keyword.operator.powershell

(type_spec) @support.type.powershell

(variable) @variable.other.powershell

(comment) @comment.line.powershell

(array_expression) @meta.array.powershell

(assignment_expression
  value: (pipeline) @meta.assignment.value.powershell)
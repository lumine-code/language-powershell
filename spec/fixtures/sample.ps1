# Assertions live in the comments: `<- scope` checks the marker's own column
# on the previous non-comment line, `^ scope` checks the caret's. Scopes
# match by prefix, so the trailing `.powershell` segment is left off.

function Get-Thing {
# <- storage.type.function
#        ^ entity.name.function

  $name = "widget"
# ^ variable
#         ^ string

  if ($name) {
# ^ keyword.control.conditional

    return 1
#   ^ keyword.control
#          ^ constant.numeric

  }

}

# a line comment
# <- comment

  
import { chainCommands, exitCode } from 'tiptap-commands'
import { HardBreak } from 'tiptap-extensions'

export class CustomHardBreak extends HardBreak {
  keys({ type }) {
    const command = chainCommands(exitCode, (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
      return true
    })
    return {
      'Mod-Enter': command,
      'Shift-Enter': command,
      Tab: command
    }
  }

}
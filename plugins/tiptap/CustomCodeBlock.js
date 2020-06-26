  
import { setBlockType, chainCommands, exitCode } from 'tiptap-commands'
import { CodeBlock } from 'tiptap-extensions'

export class CustomCodeBlock extends CodeBlock {
  keys({ type }) {
    const command = chainCommands(exitCode, (state, dispatch) => {
      const { schema, doc, tr } = state
      const hard_break = schema.nodes.hard_break
      dispatch(state.tr.replaceSelectionWith(hard_break.create()).scrollIntoView())
      return true
    })
    return {
      'Shift-Ctrl-\\': setBlockType(type),
      Escape: command
    }
  }
}
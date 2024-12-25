import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

/* -------------------------------------------------------------------------------------------------
 * Command
 * -----------------------------------------------------------------------------------------------*/

const COMMAND_NAME = 'Command';

interface CommandProps {
  children?: React.ReactNode;
}

const Command: React.FC<CommandProps> = ({ children }) => {
  return <div>{children}</div>;
};

Command.displayName = COMMAND_NAME;

/* -------------------------------------------------------------------------------------------------
 * CommandContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = 'CommandContent';

type CommandContentElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface CommandContentProps extends PrimitiveDivProps {
  children?: React.ReactNode;
}

const CommandContent = React.forwardRef<CommandContentElement, CommandContentProps>(({ children }) => {
  return <div>{children}</div>;
});

CommandContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * CommandInput
 * -----------------------------------------------------------------------------------------------*/

const INPUT_NAME = 'CommandInput';

type CommandInputElement = React.ElementRef<typeof Primitive.input>;
type PrimitiveInputProps = React.ComponentPropsWithoutRef<typeof Primitive.input>;
interface CommandInputProps extends PrimitiveInputProps {
  children?: React.ReactNode;
}

const CommandInput = React.forwardRef<CommandInputElement, CommandInputProps>((props, forwardedRef) => {
  return <Primitive.input {...props} ref={forwardedRef} />;
});

CommandInput.displayName = INPUT_NAME;

/* -------------------------------------------------------------------------------------------------
 * CommandView
 * -----------------------------------------------------------------------------------------------*/

const VIEW_NAME = 'CommandView';

type CommandViewElement = React.ElementRef<typeof Primitive.div>;
interface CommandViewProps extends PrimitiveDivProps {
  children?: React.ReactNode;
}

const CommandView = React.forwardRef<CommandViewElement, CommandViewProps>((props, forwardedRef) => {
  return <Primitive.div {...props} ref={forwardedRef} />;
});

CommandView.displayName = VIEW_NAME;

const Root = Command;
const Content = CommandContent;
const Input = CommandInput;
const View = CommandView;

export {
  //
  Command,
  CommandContent,
  CommandInput,
  CommandView,
  //
  Root,
  Content,
  Input,
  View,
};

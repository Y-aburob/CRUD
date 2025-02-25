import { Button, ButtonProps } from '@mui/material';

type ButtonComponentProps = ButtonProps & {
  content: string;
};

function ButtonComponent({ content, ...rest }: ButtonComponentProps) {
  return (
    <Button {...rest} size="small">
      {content}
    </Button>
  );
}

export default ButtonComponent;

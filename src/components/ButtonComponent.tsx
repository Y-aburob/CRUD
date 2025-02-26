import { Button, ButtonProps } from '@mui/material';

type ButtonComponentProps = ButtonProps & {
  content: string;
};

function ButtonComponent({ content, size= 'small', ...rest }: ButtonComponentProps) {
  return (
    <Button {...rest} size={size}>
      {content}
    </Button>
  );
}

export default ButtonComponent;

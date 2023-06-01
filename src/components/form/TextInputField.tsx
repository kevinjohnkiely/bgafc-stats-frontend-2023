import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface TextInputFieldProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  error?: FieldError;
  [x: string]: any;
}

const popover = (
  <Popover id='popover-basic'>
    <Popover.Header as='h3'>Player Slug Info</Popover.Header>
    <Popover.Body>
      This is the end part of a URL after the backslash (“/”) that identifies the specific player,
      e.g: www.ballingarryafc.com/players/<strong>john-smith</strong>
    </Popover.Body>
  </Popover>
);

const TextInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  tooltip,
  ...props
}: TextInputFieldProps) => {
  return (
    <>
      <Form.Group className='mb-3' controlId={`${name}-input`}>
        {tooltip ? (
          <OverlayTrigger trigger='click' placement='top' overlay={popover}>
            <Form.Label id='label-tooltip'>{label}</Form.Label>
          </OverlayTrigger>
        ) : (
          <Form.Label id='label-tooltip'>{label}</Form.Label>
        )}

        <Form.Control
          {...props}
          {...register(name, registerOptions)}
          isInvalid={!!error}
        />
        <Form.Control.Feedback type='invalid'>
          {error?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default TextInputField;

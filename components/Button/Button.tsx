import { TouchableOpacity } from 'react-native';
import React from 'react';
import { SpacingProps, VariantProps, createBox, createRestyleComponent, createText, createVariant, spacing } from '@shopify/restyle';
import { ThemeProps } from '../../theme'


const Text = createText<ThemeProps>();

type BoxCustomProps = 
  SpacingProps<ThemeProps> &
  VariantProps<ThemeProps, 'buttonVariants'>

const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
  spacing,
  createVariant({ themeKey: 'buttonVariants' })
]);

export type ButtonProps = BoxCustomProps & {
    label: string;
    onPress: Function | undefined;

};



const Button: React.FC<ButtonProps> = (props) => {
 
  return (
    <TouchableOpacity
    onPress={props.onPress}
      >
        <Box {...props}>
        <Text variant={props.variant === 'primary'? 'button_primary': "button_secondary"}
        >
        {props.label}
      </Text>

        </Box>
        
       

      
      
    </TouchableOpacity>
  );
}

  export default Button;
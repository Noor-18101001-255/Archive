import * as React from 'react';
import { View } from 'react-native';
import { Button,DefaultTheme, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import Color from '../Models/Color';
const theme = {
  ...DefaultTheme,
  roundness: 3,
  dark:true,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
  },
};
const MyComponent = (props) => {
  const [onvisible, setVisible] = React.useState(true);

  const showDialog = () => setVisible(true);

  const hideDialog = async() => {
    // await props.OnSubmit();
    props.onClose();
    // setVisible(false);
  }

  const submit = async() => {
    await props.OnSubmit();
    props.onClose();
    // setVisible(false);
  }

  return (
    <Provider  theme={theme}>
      <View  >
      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog visible={props.visible && onvisible} dismissable={true} onDismiss={hideDialog}>
            <Dialog.Title  >{props.title}</Dialog.Title>
            <Dialog.Content>
            {props.children}
              {/* <Paragraph>This is simple dialog</Paragraph> */}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={submit}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default MyComponent;
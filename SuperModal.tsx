import {
  View, Text, TouchableOpacity, TouchableWithoutFeedback,
  GestureResponderEvent, Modal, StyleSheet,
} from "react-native";
import * as React from "react";

const SuperModal = ({ isModalVisible, closeModal, handleConfirm=null, title, content, confirmText="确认", customButton = null, current= "Main", next=null, }:
{ isModalVisible:boolean, closeModal:() => void, handleConfirm:(() => boolean)|null, title:string, content:any, confirmText:string, customButton: {textLeft:string,textRight:string,onPressLeft:(event: GestureResponderEvent) => void,onPressRight:(event: GestureResponderEvent) => void }|null, current: string, next:any, }) => {

  return <Modal
    transparent={true}
    visible={isModalVisible}
    onRequestClose={closeModal}
  >
    <TouchableWithoutFeedback onPress={closeModal}><View style={styles.overlay} >
      <TouchableWithoutFeedback onPress={()=>{}}><View style={styles.modalContainer}>
        { current==='Main'?
          <>
              <Text style={styles.modalTitle}>{text}</Text>
              {content}
              <View style={styles.buttonsContainer}>
                {customButton ?
                  <>
                    <TouchableOpacity onPress={customButton.onPressLeft}
                                      style={[styles.menuButton, { borderRightWidth: 0.5 }]}>
                      <Text style={{ textAlign: "center" }}>{customButton.textLeft}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={customButton.onPressRight}
                                      style={[styles.menuButton, { borderLeftWidth: 0.5 }]}>
                      <Text style={{ textAlign: "center" }}>{customButton.textRight}</Text>
                    </TouchableOpacity>
                  </>
                  :
                  <>
                    <TouchableOpacity onPress={closeModal} style={[styles.menuButton, { borderRightWidth: 0.5 }]}>
                      <Text style={{ textAlign: "center" }}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      handleConfirm ? handleConfirm() && closeModal() : closeModal()
                    }} style={[styles.menuButton, { borderLeftWidth: 0.5 }]}>
                      <Text style={{ textAlign: "center" }}>{confirmText}</Text>
                    </TouchableOpacity>
                  </>
                }
              </View>
            </>
          :
          <>{next}</>
        }
        </View></TouchableWithoutFeedback>
    </View></TouchableWithoutFeedback>
  </Modal>
}

export default SuperModal;

const styles = StyleSheet.create({
  modalTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 200,
  },
  modalContainer: {
    width: '80%',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 34,
    elevation: 1,
  },
  inputContainer: {
    height: 50,
    lineHeight: 25,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    backgroundColor: '#F7F6F6',
    borderRadius: 28,
    overflow: 'hidden',
  },
  input_new: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)'
  },
  menuButton: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    borderColor: 'rgba(0,0,0,0.3)'
  },
});

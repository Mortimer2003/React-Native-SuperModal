# React-Native-SuperModal
封装Modal实现React Native对话框组件

参数说明：

- **`isModalVisible`**:boolean, 父组件中用于控制对话框是否可见（弹出/关闭）的布尔值；
- **`closeModal`**:() => void, 用于关闭对话框的函数，其中应包含将`isModalVisible`设为false的操作；
- **`handleConfirm`**:(() => boolean)|null, 【可选】用于处理确认键点击的函数，返回布尔值决定是否关闭对话框（默认为null，效果为点击确认直接调用`closeModal`）；
- **`title`**:string, 对话框的标题；
- **`content`**:any, 对话框的内容（JSX）；
- **`confirmText`**:string, 【可选】右下角确认键的文字（默认为“确认”）;
- **`customButton`**: {
    - `textLeft`:string,
    - `textRight`:string,
    - `onPressLeft`:(event: GestureResponderEvent) => void,
    - `onPressRight`:(event: GestureResponderEvent) => void  
    }|null, 【可选】自定义底部左右按钮的文字与功能（默认为“null”，即不自定义）;
- **`current`**: string, 【可选】用于管理对话框内多级页面，表示当前对话框所在页面（默认为“Main”，即默认页面）;
- **`next`**:any,【可选】对话框内次级页面的内容（JSX）（默认为“null”，即无次级页面）;

**使用示例：**

```tsx
<SuperModal isModalVisible={isSizeModalVisible}
            closeModal={() => {setIsSizeModalVisible(false);}}
            handleConfirm={() => {
              /*处理确认逻辑*/
              return true
            }}
            title={'长宽比'}
            content={<View style={{flexDirection: 'row',width: '90%', marginBottom: 10, alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput style={styles.input}/>
              <Text>×</Text>
              <TextInput style={styles.input}/>
            </View>}
            confirmText={"确认修改"}
/>
```
```TSX
<SuperModal isModalVisible={modalVisible!=='None'}
            title={modalTitle}
            closeModal={closeModal}
            handleConfirm={null}
            customButton={{
              textLeft: '申请加入',
              onPressLeft: ()=>{setCurrentModalScreen("Next")},
              textRight: '企业注册',
              onPressRight: ()=>{closeModal();navigation.navigate('EnterpriseRegister')},
            }}
            current={currentModalScreen}
            next={<View style={{ padding: 20, justifyContent: 'space-between', marginTop: -20 }}>
              <View style={{width: '100%', flexDirection:'row', alignItems: 'center', marginBottom: 20}}>
                <TouchableOpacity onPress={()=>{setCurrentModalScreen("Main")}}>
                  <Image source={require('../../../../assets/back.png')} style={{width: 30, height: 30, marginRight: 10}}/>
                </TouchableOpacity>
                <View style={{flexGrow: 1, height: 40,backgroundColor: 'rgba(255,255,255,0.5)',borderRadius: 28, paddingHorizontal: 10,paddingVertical:0, flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput placeholder={"请输入企业名称"}
                             value={searchText}
                             onChangeText={setSearchText}
                             onBlur={handleSearch}
                             style={{flexGrow: 1}}
                  />
                  <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../../../../assets/search.png')} style={{width: 30, height: 30}}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{height: 250}}>
                <FlatList style={{ width: '100%', borderRadius: 28}}
                          fadingEdgeLength={50}
                          data={filteredData}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity style={{alignSelf: 'center', width:"100%",flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', borderRadius: 28, marginVertical: 10, paddingVertical:10}}>
                              <Text>{item.name}</Text>
                              <Text>{item.ceo}</Text>
                            </TouchableOpacity>
                          )}
                />
              </View>
            </View>,}
            content={
              <ScrollView style={{width: '100%', height: 180}} fadingEdgeLength={20}>
                  {enterpriseList.map((item,index)=>{
                    return <TouchableOpacity style={{width: '60%', alignSelf: 'center', paddingVertical:10, marginVertical: 10, backgroundColor: 'white', borderRadius: 28, overflow: 'hidden'}}
                                             onPress={()=>{
                                               setEnterpriseName(item.enterpriseName);
                                               /*切换企业*/
                                               closeModal()
                                             }}
                    >
                      <Text style={{textAlign: 'center'}}>{item.enterpriseName}</Text>
                    </TouchableOpacity>
                  })}
                </ScrollView>
            }
/>
```

**效果示例：**

普通版：

<img src="https://github.com/Mortimer2003/React-Native-SuperModal/assets/98103203/74655c4e-92d5-4e8c-9e05-8f817b2d03c6" alt="image.png" width="50%" />

自定义按钮：

<img src="https://github.com/Mortimer2003/React-Native-SuperModal/assets/98103203/1b32de28-01d5-4a13-a9f2-6b24c6dac69b" alt="image.png" width="50%" />

次级页面：

<img src="https://github.com/Mortimer2003/React-Native-SuperModal/assets/98103203/974caf30-3496-4d43-98e0-cf4db587ff91" alt="image.png" width="50%" />


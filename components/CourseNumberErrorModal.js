import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

function courseNumberErrorModal({ closeModal }) {
    return (
        <View>
            <Modal isVisible={true}>
                <View className="flex items-center rounded-xl bg-white px-4 py-6">
                    <Text className="text-2xl font-semibold tracking-wider text-gray-600">
                        課程號碼錯誤
                    </Text>
                    <Text className="mt-4 text-base font-semibold tracking-wider text-gray-500">
                        請重新輸入
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="bg-background mt-4 rounded-2xl bg-slate-100 px-6 py-4"
                        onPress={closeModal}
                    >
                        <Text className="text-base font-semibold tracking-wider text-gray-500">
                            關閉
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default courseNumberErrorModal;

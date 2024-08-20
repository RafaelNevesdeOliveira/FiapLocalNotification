import { Text, View, Button } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import notifee, {
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

export default function App() {
  const [notificationId, setNotificationId] = useState<string | null>(null);

  async function displayNotification() {
    await notifee.requestPermission({
      criticalAlert: true,
    });

    const id = await notifee.displayNotification({
      id: "1",
      title: "Olá Rafael",
      body: "Essa é minha primeira notificação",
      ios: {
        sound: "local.wav",
        critical: true,
      },
    });

    setNotificationId(id);
  }

  async function updateNotification() {
    if (notificationId) {
      await notifee.displayNotification({
        id: notificationId,
        title: "Atualização Rafael",
        body: "Esta é uma atualização da notificação",
        ios: {
          sound: "local.wav",
          critical: true,
        },
      });
      console.log("notificação atualizaca")
    }else{
      console.log('Nenhuma notificação para atualizar')
    }
  }

  async function cancelNotification() {
    if(notificationId){
      await notifee.cancelNotification(notificationId);
      console.log('notificação cancelada');
    }else{
      console.log('Nenhuma notificação para cancelar');
    }
  }


  async function scheduleNotification() {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 10);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        id: '2',
        title: "Notificação Agendada",
        body: 'Aplicativo em segundo plano!',
        ios: {
          sound: "local.wav",
          critical: true,
        },
      },
      trigger
    )
  }

  return (
    <View style={styles.container}>
      <Text>Notificações</Text>
      <Button title="Enviar Notificação" onPress={displayNotification}></Button>
      <Button title="Atualizar Notificação" onPress={updateNotification}></Button>
      <Button title="Cancelar Notificação" onPress={cancelNotification}></Button>
      <Button title="Agendar Notificação" onPress={scheduleNotification}></Button>
    </View>
  );
}

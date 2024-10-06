class WebSocketService {
  private socket: WebSocket | null = null;

  private url: string = '';

  private onMessageCallback: ((message: string) => void) | null = null;

  constructor(chatId: number, userId: number, token: string) {
    this.url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
  }

  // Метод для открытия соединения
  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket соединение открыто');

      this.sendMessage(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data); // Передаем сообщение через колбэк
      }
    };

    this.socket.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };
  }

  // Метод для закрытия соединения
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Метод для отправки сообщения
  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.warn('WebSocket соединение не открыто');
    }
  }

  // Метод для установки колбэка на получение сообщений
  onMessage(callback: (message: string) => void) {
    this.onMessageCallback = callback;
  }
}

export default WebSocketService;

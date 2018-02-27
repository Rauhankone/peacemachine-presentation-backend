export const socketControllers: SocketControllers = {
  on: {
    connected(data: any) {
      console.log(data)
    }
  }
}

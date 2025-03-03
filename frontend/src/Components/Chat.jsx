/*import React, { Component } from "react";
import { Launcher } from "react-chat-window";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "Help-Desk",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}

export { Chat };*/

import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#007bff",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#007bff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const steps = [
  {
    id: "1",
    message: "Hello! Welcome to Help-Desk. How can I assist you?",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: 1, label: "I need support", trigger: "3" },
      { value: 2, label: "I have a billing issue", trigger: "4" },
    ],
  },
  {
    id: "3",
    message: "Sure! Please describe your issue.",
    end: true,
  },
  {
    id: "4",
    message: "Billing support is available. Please contact finance@support.com.",
    end: true,
  },
];

const Chat = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} floating={true} />
    </ThemeProvider>
  );
};

export { Chat };


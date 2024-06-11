import axios from "axios";

const host = "https://api-dev.7esl.com/";
// const host = "http://localhost:8080/";

export const getListCategory = async () => {
  try {
    const url = host + "web/list-category";
    const result = await axios.get(url);
    return result;
  } catch (error) {}
};

export const getListTutor = async (categoryId: number) => {
  try {
    const url = host + "web/tutor/" + categoryId;
    const result = await axios.get(url);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getLessonByAssistant = async (assistantId: number) => {
  try {
    const url = host + "web/lessons/" + assistantId;
    const result = await axios.get(url);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createConversationByAssistant = async (data: {
  assistantId: number;
  message: string;
}) => {
  try {
    const url = host + "web/new-chat";
    const result = await axios.post(url, data);
    return result;
  } catch (error) {}
};

export const addConversation = async (data: {
  conversationId: string;
  message: string;
}) => {
  try {
    console.log(data.conversationId);
    const url = host + "web/add-message";
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

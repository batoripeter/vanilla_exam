import http from 'axios'
import {z} from 'zod'
import { chatLoader } from './getmessages';
import { load } from './main';
const newMessageResponseSchema = z.object({
    user:z.string(),
    message: z.string(),
    createdAt: z.string()
  });

  
const newMessageArraySchema = z.array(newMessageResponseSchema);
type NewMessageResponse = z.infer<typeof newMessageArraySchema>;


/////////post message

export async function postMessage() {
    let newMessage = (document.getElementById("newMessage") as HTMLInputElement).value;

    try {
        const response = await http.post("http://localhost:8080/api/messages", {
                user:"Client",
                message : newMessage,
        
        });
       const messageData: NewMessageResponse = response.data;
       const result = newMessageResponseSchema.safeParse(messageData);
       (document.getElementById("app") as HTMLElement).innerHTML=""
        if (!result.success) {
            alert("Post Error");
            (document.getElementById("newMessage") as HTMLInputElement).value = newMessage
          }
        console.log("Success:", result);
        load()
        chatLoader()
      } catch (error) {
        console.error("Error:", error);
      }

      
    }
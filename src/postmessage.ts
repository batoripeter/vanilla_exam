import http from 'axios'
import {z} from 'zod'


const newMessageResponseSchema = z.object({
    user:z.string(),
    message: z.string(),
    createdAt: z.string()
  });

  
const newMessageArraySchema = z.array(newMessageResponseSchema);
type NewMessageResponse = z.infer<typeof newMessageArraySchema>;

const date = new Date();
let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();
let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

let newMessage = ""

const formData = new FormData();
formData.append("user","Client")
formData.append("message", newMessage)
formData.append("createdAt", currentDate)


/////////post message

export async function postMessage() {
    try {
        const response = await http.post("http://localhost:8080/api/messages", formData);
        const messageData: NewMessageResponse = response.data;
        const result = newMessageArraySchema.safeParse(messageData);
        newMessage = (document.getElementById("newMessage") as HTMLInputElement).value

        if (!result.success) {
            alert("Post Error");
          }
        console.log("Success:", result);
        let message = document.createElement("p");
        message.innerHTML = "y"
      } catch (error) {
        console.error("Error:", error);
      }

      
    }
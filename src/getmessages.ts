import http from 'axios'
import {z} from 'zod'

const chatResponseSchema = z.object({
    user:z.string(),
    message: z.string(),
    createdAt: z.string()
  });
  
  
  const chatArraySchema = z.array(chatResponseSchema);
  type ChatResponse = z.infer<typeof chatArraySchema>;


    export const chatLoader = async () => {
    const response = await http.get("http://localhost:8080/api/messages");
    const chatFromJson: ChatResponse = response.data;
    const result = chatArraySchema.safeParse(chatFromJson);
      if (!result.success) {
      alert("Chat Error");
    }
    let i = 0
    while (i<chatFromJson.length) {
     let messages = document.createElement("p") as HTMLElement;
      messages.innerText = chatFromJson[i].user + " : "+ chatFromJson[i].message
      document.getElementById("app")!.appendChild(messages)
     i++
    }

    }


import Button from "domains/common/components/Button";
import style from "./ChatPage.module.css";

function ChatPage() {
  const handleClick = () => null;
  return (
    <div className={style.container}>
      <main className={style.chat}>
        <section className={style.profile}>
          <div className={style.profileAvatar}>
            <picture>
              <img src="https://content2.rozetka.com.ua/goods/images/big/191142789.jpg" alt="губка боб" />
            </picture>
          </div>
          <div>
            <h2>Client name</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ab odio consequuntur velit similique molestias, provident aliquam alias illo veniam dolores vitae.
              Veniam minima porro, deleniti doloribus modi nam velit saepe voluptate adipisci nobis libero eligendi
              veritatis at illo est sit!
            </p>
          </div>
        </section>
        <section className={style.chatContainer}>
          <div className={style.messageList}>
            message
            message
            message
            message
            message
          </div>
          <div className={style.textField}>
            <input className={style.textFieldInput} type="text" />
            <Button onClick={handleClick}>Send Message</Button>
          </div>
        </section>
      </main>
      <aside className={style.chatList}>
        chatList
      </aside>
    </div>
  );
}

export default ChatPage;

import { useContext } from "react";
import { InputContext } from "../contexts/InputContext";

const Input = () => {
  //값이 아니라 주소가 넘어온다.
  const { input, insertTodo, handleChangeText } = useContext(InputContext);
  //useContext 부모에서 자식넘겨주는 역할만함
  return (
    <form onSubmit={insertTodo}>
      <input
        type="text"
        required={true}
        value={input}
        onChange={handleChangeText}
      />
      <input type="submit" value="Create" />
    </form>
  );
};

export default Input;

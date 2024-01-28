const errors = [];

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
};

const [values, setValues] = useState(initialState);

//value datas from is form

Object.entries(values).map((data, index) => {
  const [key, value] = data;
  if (value.trim() === "") {
    errors.push(key);
  }
});
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import {formSchema} from "@whatsapp-clone/common"


const Login = () => {
  const navigate = useNavigate();
  // Valida el formulario
  // const formik = useFormik({
  //   initialValues: { username: "", password: "" },
  //   validationSchema: Yup.object({
  //     username: Yup.string()
  //     .required("Username required")
  //     .min(6,"Username too short!")
  //     .max(28,"Username too long!"),
  //     password: Yup.string()
  //     .required("Password required")
  //     .min(6,"Password too short!")
  //     .max(28,"Password too long!"),
  //   }),
  //   onSubmit:(values,actions)=>{
  //     alert(JSON.stringify(values,null,2));
  //     actions.resetForm();
  //   },
  // });
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            console.log(data);
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Log In</Heading>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />
        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
        />
        {/* //Username */}
        {/* <FormControl isInvalid={formik.errors.username && formik.touched.username}>
        <FormLabel fontSize={"lg"}>Username</FormLabel>
        <input
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          // value={formik.values.username}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          //desetructurando el objeto para validar el formulario
          {...formik.getFieldProps("username")}
          style={{ width: "370px" }}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl> */}
        {/* password */}
        {/* <FormControl isInvalid={formik.errors.password && formik.touched.password}>
        <FormLabel fontSize="lg">Password</FormLabel>
        <input
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          size="lg"
          type="password"
          style={{ width: "370px" }}
          {...formik.getFieldProps("password")}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl> */}

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};
export default Login;

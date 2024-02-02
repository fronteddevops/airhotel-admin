// /* eslint-disable react/jsx-max-props-per-line */
// import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Layout as AuthLayout } from 'src/layouts/auth/layout';
// import { useCallback, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const Page = () => {
//   const router = useRouter();
//   const auth = useAuth();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   }

//   const formik = useFormik({
//     initialValues: {
//       email: 'demo@devias.io',
//       password: 'Password123!',
//       submit: null,
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//       password: Yup.string().max(255).required('Password is required'),
//     }),
//     onSubmit: async (values, helpers) => {
//       try {
//         await auth.signIn(values.email, values.password);
//         // Redirect after successful login
//         router.push('/');
//       } catch (err) {
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     },
//   });

//   const handleSkip = useCallback(
//     () => {
//       auth.skip();
//       router.push('/');
//     },
//     [auth, router]
//   );

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: 'background.paper',
//           flex: '1 1 auto',
//           alignItems: 'center',
//           display: 'flex',
//           justifyContent: 'center',
//           backgroundImage: "url('/assets/bag.jpeg')",
//           backgroundSize: 'cover',
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: 'white', 
//             maxWidth: 500,
//             px: 3,
//             py: '50px',
//             width: '100%',
//             borderRadius: '10px',
//           }}
//         >
//           <Stack spacing={1} sx={{ mb: 3 }}>
//             <Typography variant="h4">Login</Typography>
//           </Stack>

//           <form noValidate onSubmit={formik.handleSubmit}>
//       <Stack spacing={3}>
//         <TextField
//           error={!!(formik.touched.email && formik.errors.email)}
//           fullWidth
//           helperText={formik.touched.email && formik.errors.email}
//           label="Email Address"
//           name="email"
//           onBlur={formik.handleBlur}
//           onChange={formik.handleChange}
//           type="email"
//           value={formik.values.email}
//         />
//         <TextField
//           error={!!(formik.touched.password && formik.errors.password)}
//           fullWidth
//           helperText={formik.touched.password && formik.errors.password}
//           label="Password"
//           name="password"
//           onBlur={formik.handleBlur}
//           onChange={formik.handleChange}
//           type={showPassword ? 'text' : 'password'}
//           value={formik.values.password}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleTogglePasswordVisibility} edge="end">
//                   {showPassword ? <Visibility /> : <VisibilityOff />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       {formik.errors.submit && (
//         <Typography color="error" sx={{ mt: 3 }} variant="body2">
//           {formik.errors.submit}
//         </Typography>
//       )}

//       <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
//         Continue
//       </Button>

//       <Button fullWidth size="large" sx={{ mt: 3 }} onClick={handleSkip}>
//         Skip authentication
//       </Button>
//     </form>
//         </Box>
//       </Box>
//     </>
//   );
// };

// Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

// export default Page;
/* eslint-disable react/jsx-max-props-per-line */
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import services from "../../services"
import Toaster from 'src/components/toaster';

const Page = () => {
  const router = useRouter();
  // const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [toaster, setToaster] = useState({ visiblity: "hide" });
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  const formik = useFormik({
    initialValues: {
      email: 'airadmin@yopmail.com',
      password: 'admin123',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
       
        let payload = {
          email: values.email,
          password: values.password,
         
        };
  
        const response = await services.auth.LOGIN_USER(payload)
       
        if (response) {
         
          setToaster({
            type: "success",
            title: "Successful",
            text: "Login successfully",
            visiblity: "show",
          });
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      } catch (err) {
        console.log(err)
        setToaster({
          type: "success",
          title: "Successful",
          text: "Error",
          visiblity: "show",
        });
        setTimeout(() => {
          setToaster({
            visiblity: "hide",
          });
        }, 1500);
      }
    },
    
  });

 
  //  const handleSubmit = async()=>{
  //   try {
  //     let payLoad = {
  //       email: email,
  //       password: password,
  //       role:Admin
  //     }

  //     const response = await services.auth.LOGIN_USER(payLoad)
    
  //     // if (response) {
  //     //   setToaster({
  //     //     type: "success",
  //     //     title: "Successful",
  //     //     text: "Login successfully",
  //     //     visiblity: "show",
  //     //   });
  //     //   setTimeout(() => {
  //     //     navigate("/users");
  //     //   }, 500);
  //     // }

    
  //   } catch (error) {
  

  //     // setToaster({
  //     //   type: "danger",
  //     //   title: "Error Occured",
  //     //   text: error?.response?.data?.message,
  //     //   visiblity: "show",
  //     // });
  //     // setTimeout(() => {
  //     //   setToaster({
  //     //     visiblity: "hide",
  //     //   });
  //     // }, 1500);
  //   }
  // }
   
  return (
    <>
     <Toaster
        type={toaster.type}
        title={toaster.title}
        text={toaster.text}
        visiblity={toaster.visiblity}
      />
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          backgroundImage: "url('/assets/bag.jpeg')",
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white', 
            maxWidth: 500,
            px: 3,
            py: '50px',
            width: '100%',
            borderRadius: '10px',
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
          </Stack>

          <form noValidate 
          onSubmit={formik.handleSubmit}
          >
      <Stack spacing={3}>
        <TextField
          error={!!(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={!!(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {formik.errors.submit && (
        <Typography color="error" sx={{ mt: 3 }} variant="body2">
          {formik.errors.submit}
        </Typography>
      )}

      <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained" onSubmit={(e)=>handleSubmit(e)}>
        Continue
      </Button>

    </form>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;


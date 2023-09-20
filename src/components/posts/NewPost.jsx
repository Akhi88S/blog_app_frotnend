import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { useAddUpdatePost } from "../../hooks/posts";
import { useAuth } from "../../hooks/auths";
export default function SimpleCard({
  onModalClose,
  isEdit,
  formData,
  setCurrentPost,
}) {
  const { addUpdatePost, isLoading } = useAddUpdatePost();
  const { user, authLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const handlePost = (data) => {
    addUpdatePost({
      id: formData?.id,
      uid: user?.id || "test_user",
      title: data.title,
      desc: data.desc,
      imageUrl: data.imageUrl,
      isEdit,
    });
    if (isEdit) {
      setCurrentPost({
        ...formData,
        uid: user?.id || "test_user",
        title: data.title,
        desc: data.desc,
        imageUrl: data.imageUrl,
      });
    }
    reset();
    onModalClose();
  };

  return (
    <Flex minH={"40vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"90%"} minW={"90%"} py={12}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            {isEdit ? "Update post" : "Add new post"}
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack>
            <form onSubmit={handleSubmit(handlePost)}>
              <FormControl id="title">
                <FormLabel>Blog Title</FormLabel>
                <Input
                  type="text"
                  defaultValue={isEdit ? formData?.title : ""}
                  {...register("title", { required: true, maxLength: 120 })}
                />
                <FormHelperText>
                  Eg: The Art of Effective Communication
                </FormHelperText>
              </FormControl>
              <FormControl id="image">
                <FormLabel> Image URL</FormLabel>
                <Input
                  type="url"
                  defaultValue={isEdit ? formData?.imageUrl : ""}
                  {...register("imageUrl", { required: true })}
                />
                <FormHelperText>
                  <Link
                    onClick={() => {
                      const randomNumber = Math.random();
                      navigator.clipboard.writeText(
                        `https://picsum.photos/200/300?random=${randomNumber}`
                      );
                      toast({
                        title: "URL Copied",
                        status: "success",
                        isClosable: true,
                        position: "top",
                        duration: 2000,
                      });
                    }}
                  >
                    Eg: https://picsum.photos/200/300/
                  </Link>
                  <div>
                    <Text as="mark">Copy image link by click</Text>
                  </div>
                </FormHelperText>
              </FormControl>
              <FormControl id="desc">
                <FormLabel> Description</FormLabel>
                <Textarea
                  placeholder='I know writing can be tough, Just type "blah blah blah" to test things out!'
                  as={TextareaAutosize}
                  minRows={5}
                  resize={"none"}
                  defaultValue={isEdit ? formData?.desc : ""}
                  {...register("desc", { required: true })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  mt={"10px"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText={"Loading..."}
                >
                  {isEdit ? "Update" : "Hit the Big Blue Button! POST"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

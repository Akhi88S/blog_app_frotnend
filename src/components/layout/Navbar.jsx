import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { LOGIN, REGISTER, ROOT } from "../../lib/routes";
import { Link as routerLink } from "react-router-dom";
import Newpost from "../posts/NewPost";
import { ModalBody } from "react-bootstrap";
import { useLogout } from "../../hooks/auths";
import { useAuth } from "../../hooks/auths";
import { useEffect, useLayoutEffect } from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode,setColorMode } = useColorMode();
  const { logout } = useLogout();
  const { user } = useAuth();
  const isMobile = window?.innerHeight < 1024;
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const Links = [
    { id: 1, path: ROOT, name: "Home" },
    { id: 2, path: LOGIN, name: "Sign in" },
    { id: 3, path: REGISTER, name: "Create an account" },
  ];
  useLayoutEffect(()=>{
    setColorMode('dark')
  },[])
  return (
    <Container maxW="1300px">
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isMenuOpen ? onMenuClose : onMenuOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as="b" fontSize="2xl">
              <Link
                as={routerLink}
                to={ROOT}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <svg
                  fill={colorMode === "light" ? "#000000" : "#ffffff"}
                  height={isMobile ? "40px" : "50px"}
                  width="64px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  stroke={colorMode === "light" ? "#000000" : "#ffffff"}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M200.533,213.331H268.8c7.057,0,12.8-5.743,12.8-12.8s-5.743-12.8-12.8-12.8h-68.267c-7.057,0-12.8,5.743-12.8,12.8 S193.476,213.331,200.533,213.331z"></path>{" "}
                          <path d="M311.467,298.664H200.533c-7.057,0-12.8,5.743-12.8,12.8s5.743,12.8,12.8,12.8h110.933c7.057,0,12.8-5.743,12.8-12.8 S318.524,298.664,311.467,298.664z"></path>{" "}
                          <path d="M349.867,230.397h-8.533v-51.251c0-39.578-41.737-68.215-69.862-68.215h-77.338c-48.981,0-83.2,34.364-83.2,83.575 v122.906c0,49.254,34.219,83.652,83.2,83.652h123.733c48.683,0,82.901-34.424,83.2-83.703v-30.669 C401.067,243.018,389.581,230.397,349.867,230.397z M200.533,170.664H268.8c16.469,0,29.867,13.397,29.867,29.867 c0,16.469-13.397,29.867-29.867,29.867h-68.267c-16.469,0-29.867-13.397-29.867-29.867 C170.667,184.061,184.064,170.664,200.533,170.664z M311.467,341.331H200.533c-16.469,0-29.867-13.397-29.867-29.867 c0-16.469,13.397-29.867,29.867-29.867h110.933c16.469,0,29.867,13.397,29.867,29.867 C341.333,327.933,327.936,341.331,311.467,341.331z"></path>{" "}
                          <path d="M472.533,0H39.467C17.707,0,0,17.613,0,39.262v433.476C0,494.387,17.707,512,39.467,512h433.067 c21.76,0,39.467-17.613,39.467-39.262V39.262C512,17.613,494.293,0,472.533,0z M418.133,317.414 c-0.358,58.377-42.522,100.719-100.267,100.719H194.133c-58.104,0-100.267-42.359-100.267-100.719V194.509 c0-58.317,42.163-100.642,100.267-100.642h77.338c34.603,0,86.929,34.014,86.929,85.274v34.432 c49.306,2.867,59.733,31.394,59.733,73.114V317.414z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </Link>
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={1}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    <b>{link.name}</b>
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button mr={4} onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {user ? (
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                onClick={onModalOpen}
                leftIcon={<AddIcon />}
              >
                Create Post
              </Button>
            ) : null}
            {/* Modal */}
            <Modal
              closeOnOverlayClick={false}
              isOpen={isModalOpen}
              onClose={onModalClose}
              size={"xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody pb={12}>
                  <Newpost onModalClose={onModalClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
            {/* Modal end */}
            {user && (
              <Button
                ml="auto"
                colorScheme="teal"
                size="sm"
                onClick={logout}
              >
                <Icon as={RiLogoutCircleLine} />
              </Button>
            )}
          </Flex>
        </Flex>

        {isMenuOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {!user ? (
                Links.map((link) => (
                  <Link
                    px={2}
                    py={1}
                    as={routerLink}
                    to={link.path}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    key={link.id}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                <Link
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Glad you're here!😍
                </Link>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
}

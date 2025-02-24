import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import game from "../reducers/game"
import { fetchGame } from "reducers/game"

import {
  GameArea,
  Heading,
  Container,
  Input,
  StyledButton,
  FlexCenter,
} from "styles"

import Footer from "./Footer"

const StartScreen = () => {
  const [nameInput, setNameInput] = useState("")

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const onNameSubmit = (nameInput) => {
    dispatch(game.actions.setUserName(nameInput))
    navigate("/GamePlay")
    setNameInput("")
  };

  const onSetNameInput = (event) => {
    setNameInput(event.target.value)
  };

  const onEnter = (event) => {
    if (event.key === "Enter") {
      onNameSubmit(nameInput)
      dispatch(fetchGame(nameInput))
    }
  };

  const onStart = () => {
    onNameSubmit(nameInput)
    dispatch(fetchGame(nameInput))
  };

  return (
    <GameArea>
      <FlexCenter>
        <Heading>Let's play a game!</Heading>

        <Container>
          <label>
            <p>Add your username:</p>

            <Input
              type="text"
              value={nameInput}
              placeholder="Enter name here"
              onChange={onSetNameInput}
              onKeyDown={(event) => {
                onEnter(event)
              }}
            />
          </label>
          <StyledButton unclickable={!nameInput} onClick={() => onStart()}>
            I'm ready
          </StyledButton>
        </Container>
      </FlexCenter>
      <Footer />
    </GameArea>
  );
};

export default StartScreen

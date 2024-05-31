import React, { useState, useEffect } from 'react';
import { HeaderComponent } from "../HeaderComponent";
import { FooterComponent } from "../FooterComponent";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Avatar } from "@mui/material";
import "../../Styles.css";

export const ImpressumComponent = (props) => {
  const playername = props.playername || "";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [avatarColor, setAvatarColor] = useState('');
  
  useEffect(() => {
    const colors = ['#1976D2', '#388E3C', '#FBC02D', '#D32F2F', '#7B1FA2', '#FF5722'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setAvatarColor(randomColor);
  }, []);

  const handleGameEnd = () => {
    navigate("/");
  };

  const handleScoreboard = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewGame = () => {
    navigate("../form");
  };

  const renderAvatar = () => {
    if (playername) {
      const initials = playername.charAt(0).toUpperCase();
      return (
        <Avatar sx={{ bgcolor: avatarColor, marginRight: '10px' }}>{initials}</Avatar>
      );
    }
    return null;
  };

  const buttonStyle = {
    marginBottom: '10px',
    backgroundColor: '#E7F6FF',
    color: '#000',
    height: '36px',
    textTransform: 'none'
  };

  const scoreboardData = [
    { name: Player1, Player3, points: PlayerP1, PlayerP3 },
    { name: Player3, Player4, points: PlayerP2, PlayerP4 },
  ];

  const sortedPlayers = scoreboardData.sort((a, b) => b.points - a.points);

  return (
    <>
      <HeaderComponent playername={playername} />
      <div className="ImpressumWrapper" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '100px', right: '50px'}}>
          <Button variant="contained" color="primary" onClick={handleNewGame} style={buttonStyle}>
            Neues Spiel
          </Button>
          <Button variant="contained" onClick={handleScoreboard} style={buttonStyle}>Scoreboard</Button>
        </div>
        <div style={{ position: 'absolute', top: '0', left: '0', margin: '10px', transform: 'translateX(-100%)' }}>
          {renderAvatar()}
        </div>
      </div>
      <FooterComponent />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ width: 400, bgcolor: 'background.paper', p: 3, borderRadius: '8px' }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Scoreboard
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPlayers.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell align="right">{player.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleNewGame} style={buttonStyle}>
              Neues Spiel
            </Button>
            <Button variant="contained" color="secondary" onClick={handleGameEnd} style={buttonStyle}>
              Beenden
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ImpressumComponent;

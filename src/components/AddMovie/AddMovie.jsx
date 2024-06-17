import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const AddMovie = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((store) => store.genres);

  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleCancel = () => {
    history.push('/');
  };

  const submitNewMovie = () => {
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title: title,
        poster: posterUrl,
        description: description,
        genre_id: selectedGenre,
      },
    });

   
    history.push('/');
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value); // Update selected genres array
  };

  return (
    <div>
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <h2>Add Movie</h2>
      <TextField
        label="Movie Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Poster Image URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={posterUrl}
        onChange={(e) => setPosterUrl(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
            labelId="genre-label"
            multiple // Allow multiple selection
            value={selectedGenre}
            onChange={handleGenreChange}
            label="Genres"
            renderValue={(selected) => (
              <div>
                {selected.map((id) => {
                  const genre = genres.find((g) => g.id === id);
                  return <div key={id}>{genre ? genre.name : ''}</div>;
                })}
              </div>
            )}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
      <Button onClick={handleCancel} variant="outlined" sx={{ mr: 2 }}>
        Cancel
      </Button>
      <Button onClick={submitNewMovie} variant="contained" color="primary">
        Save
      </Button>
    </Box>
    </div>
  );
};

export default AddMovie;

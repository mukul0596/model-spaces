import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import modelPlaceholder from "../../assets/images/model-placeholder.jpg";
import { Link } from "react-router-dom";

const ModelCard = ({ data }) => {
  const { id, name, description, avatar } = data;
  const cardAvatar = avatar ? avatar : modelPlaceholder;

  return (
    <Card elevation={0}>
      <CardActionArea component={Link} to={`/${id}`} sx={{ height: "100%" }}>
        <CardMedia component="img" height={200} image={cardAvatar} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxHeight: 180, overflowY: "auto" }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ModelCard;

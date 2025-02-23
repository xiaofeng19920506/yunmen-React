import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface DashboardCardProps {
  id: string;
  title: string;
  content: string[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  title,
  content = [],
}) => {
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    navigate(`/cards/${id}`);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: 400, margin: 2 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {content.join(" ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;

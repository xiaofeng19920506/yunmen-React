import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { EventContent } from "../redux/reducer/user/userSlice";

interface DashboardCardProps {
  id: string;
  title: string;
  content: EventContent[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({ id, title }) => {
  const navigate = useNavigate();

  const handleCardClick = (): void => {
    navigate(`/cards/${id}`);
  };

  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={handleCardClick} sx={{ height: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            padding: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              fontWeight: "bold",
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
              flexGrow: 1,
            }}
          >
            {/* {content.map({})} */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;

interface Props {
  color: string;
}

const GifByColor = ({ color }: Props) => {
  const getGIfName = (color: string): string => {
    switch (color) {
      case "#e0aea4":
        return "purple-room.gif";
      case "#e9d887":
        return "yellow-room.gif";
      case "#a7b78b":
        return "house-light.gif";
      case "#89a99d":
        return "green-office.gif";
      case "#9db4c1":
        return "cyan-office.gif";
      case "#aba2b9":
        return "purple-room.gif";
      case "#9c8f81":
        return "house-light.gif";
      case "white":
        return "house-light.gif";
      case "#181818":
        return "house-dark.gif";

      default:
        return "house-light.gif";
    }
  };
  return <img src={getGIfName(color)} alt="" className="art" />;
};

export default GifByColor;

import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import * as Icons from "../icons";
import { IconName } from "../types";


interface Props {
  name: IconName;
  height: number;
  width: number;
  className?: string;
}
interface SelectedIconProps {
  className?: string;
  height: number;
  width: number;
  fill : string;
}

const Icon = ({ name, height, width, className }: Props) => {
  const { colors } = useSelector((state: RootState) => state.colors);
  let fill = colors.backgroundColor === "#181818" ? "white" : "black";

  const SelectedIcon = Icons[name] as React.FunctionComponent<SelectedIconProps>;
 

  return (
    <SelectedIcon
      className={className}
      height={height}
      width={width}
      fill={fill}
    />
  );
};

export default Icon;

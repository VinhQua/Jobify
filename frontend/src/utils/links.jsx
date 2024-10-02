import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdCorporateFare } from "react-icons/md";
const links = [
  { id: 1, text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  {
    id: 2,
    text: "all companies",
    path: "all-companies",
    icon: <MdCorporateFare />,
  },
  { id: 3, text: "add job", path: "add-job", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];
export default links;

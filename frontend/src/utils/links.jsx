import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdCorporateFare } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { FaUserFriends, FaUser } from "react-icons/fa";
const links = [
  { id: 1, text: "all jobs", path: "", icon: <MdQueryStats /> },
  { id: 2, text: "add job", path: "add-job", icon: <FaWpforms /> },
  {
    id: 3,
    text: "all companies",
    path: "all-companies",
    icon: <MdCorporateFare />,
  },
  {
    id: 4,
    text: "add company",
    path: "add-company",
    icon: <GrOrganization />,
  },
  {
    id: 5,
    text: "all admins",
    path: "all-admins",
    icon: <FaUserFriends />,
  },
  {
    id: 6,
    text: "add admin",
    path: "add-admin",
    icon: <FaUser />,
  },
];
export default links;

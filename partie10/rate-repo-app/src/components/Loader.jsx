import ContentLoader from "react-content-loader/native"
import { Rect } from "react-native-svg"

const Loader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="80" y="19" rx="3" ry="3" width="88" height="6" /> 
    <Rect x="80" y="33" rx="3" ry="3" width="52" height="6" /> 
    <Rect x="19" y="68" rx="3" ry="3" width="410" height="6" /> 
    <Rect x="19" y="81" rx="3" ry="3" width="380" height="6" /> 
    <Rect x="19" y="95" rx="3" ry="3" width="178" height="6" /> 
    <Rect x="23" y="8" rx="5" ry="5" width="50" height="50" />
  </ContentLoader>
)

export default Loader
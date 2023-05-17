import {  } from '@mui/material/Button'
import Button from '@mui/material/Button';
var CljsButton = function (props) {
return <Button variant="contained" color="primary" onClick={function () {
return alert("Hello, world!");
}} sx={({ "mx": 1 })} {...props}></Button>;
}
;

export { CljsButton }

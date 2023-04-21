import MainNavigation from "./MainNavigation";
import classes from "./MainLayout.module.css";

function Layout(props) {
  return (
    // feta assai
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

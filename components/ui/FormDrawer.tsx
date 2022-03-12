import { useScreenContext } from "lib/context/ScreenContext";
import styles from './styles/FormDrawer.module.scss'
import { BackButton } from "components/shared/BackButton";
import ModalShadow from "components/shared/ModalShadow";

interface FormDrawerProps {
  cancel: () => void,
  save: () => void,
  show: boolean,
  editing?: boolean
}

const FormDrawer:React.FC<FormDrawerProps> = ({cancel, save, show, children, editing=false}) => {
  const { screenType } = useScreenContext();
  
  return (
    <>
      <div className={styles.root} style={{transform: show ? "translateX(0%)" : `translateX(-100%)`}}>
        {screenType === "phone" && <BackButton onClick={cancel} />}
        <form className={styles.content} onSubmit={save}>
          <div className={styles.padding}>
            {children}
          </div>

          <div className={styles.bottomControls}>
            {editing && (
              <>
                {/* empty div for flexbox  */}
                <div />
                <div>
                  <button className="btn btn-light" type="button" onClick={cancel}>Cancel</button>
                  <button className="btn btn-purple" type="submit">Save Changes</button>
                </div>
              </>
            )}
            {!editing && (
              <>
                <div>
                  <button className="btn btn-light" type="button" onClick={cancel}>Discard</button>
                </div>
                <div>
                  <button className="btn btn-purple" type="submit">{"Save"}</button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      <ModalShadow show={show} cancel={cancel} />
    </>
  )
}

export default FormDrawer;
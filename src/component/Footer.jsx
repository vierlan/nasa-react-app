export default function Footer(props) {
  const { toggleModal, data } = props

    return (

        <footer>
          <div className="bgGradient"></div>
          <div>
          <h1>Daily Photo From Space</h1>
            <h2>{data?.title}</h2>
          </div>
            <button onClick={toggleModal}>
              < i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>

    )
}

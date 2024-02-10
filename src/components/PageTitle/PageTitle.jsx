const PageTitle = ({ title }) => {
  return (
    <div className="page-header">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="page-title">Welcome to {title}!</h3>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;

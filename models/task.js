// Define the User object

// Creating our Task model
module.exports = function (sequelize, DataTypes) {
	var Task = sequelize.define("Task", {
		assignedUser: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		taskDetail: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dueDate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		graded: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		taskGrade: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: true,
		}
	});

	// Relationships
	Task.associate = function(models) {
		// Student has many Tasks
		Task.belongsTo(models.User, {
			foreignKey: "assignedUser",
			targetKey: "id"
		});
	};

	return Task;
};
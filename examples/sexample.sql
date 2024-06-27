-- DROP SCHEMA sync_data_states;

CREATE SCHEMA sync_data_states;
-- SyncData.sync_data_states.Workflows definition

-- Drop table

-- DROP TABLE SyncData.sync_data_states.Workflows;

CREATE TABLE Workflows (
	Id uniqueidentifier NOT NULL,
	[Type] nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreatedDate datetime2 NOT NULL,
	Status nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	UpdatedDate datetime2 NULL,
	CONSTRAINT PK_Workflows PRIMARY KEY (Id)
);


-- SyncData.sync_data_states.Processes definition

-- Drop table

-- DROP TABLE SyncData.sync_data_states.Processes;

CREATE TABLE Processes (
	Id uniqueidentifier NOT NULL,
	Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Status nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	WorkflowId uniqueidentifier NOT NULL,
	Content nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreatedDate datetime2 NOT NULL,
	CONSTRAINT PK_Processes PRIMARY KEY (Id),
	CONSTRAINT FK_Processes_Workflows_WorkflowId FOREIGN KEY (WorkflowId) REFERENCES Workflows(Id) ON DELETE CASCADE
);
CREATE NONCLUSTERED INDEX IX_Processes_WorkflowId ON SyncData.sync_data_states.Processes (WorkflowId);
@description('Cosmos DB account name')
param cosmosAccountName string

@description('Region for Cosmos DB account')
param primaryRegion string

var locations = [
  {
    locationName: primaryRegion
    failoverPriority: 0
    isZoneRedundant: false
  }
]

resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2024-05-15' = {
  name: cosmosAccountName
  location: primaryRegion
  kind: 'GlobalDocumentDB'
  properties: {
    publicNetworkAccess: 'Enabled'
    enableAutomaticFailover: false
    enableMultipleWriteLocations: false
    isVirtualNetworkFilterEnabled: false
    virtualNetworkRules: []
    disableKeyBasedMetadataWriteAccess: false
    enableFreeTier: false
    enableAnalyticalStorage: false
    analyticalStorageConfiguration: {
      schemaType: 'WellDefined'
    }
    databaseAccountOfferType: 'Standard'
    defaultIdentity: 'FirstPartyIdentity'
    networkAclBypass: 'None'
    disableLocalAuth: false
    enablePartitionMerge: false
    enableBurstCapacity: false
    minimalTlsVersion: 'Tls12'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
      maxIntervalInSeconds: 5
      maxStalenessPrefix: 100
    }
    locations: locations
    cors: []
    capabilities: [
        {
            name: 'EnableServerless'
        }
        {
            name: 'EnableNoSQLVectorSearch'
        }
    ]
    ipRules: []
    backupPolicy: {
        type: 'Periodic'
        periodicModeProperties: {
            backupIntervalInMinutes: 240
            backupRetentionIntervalInHours: 8
            backupStorageRedundancy: 'Local'
        }
    }
    networkAclBypassResourceIds: []
    capacity: {
        totalThroughputLimit: 4000
    }
  }
}

@description('Cosmos DB database name')
param cosmosDatabaseName string

resource cosmosDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2024-05-15' = {
  parent: cosmosAccount
  name: cosmosDatabaseName
  properties: {
    resource: {
      id: cosmosDatabaseName
    }
  }
}

// ContainerのベクトルインデックスはBicepに対応していないため、AzurePortalから手動で作成する

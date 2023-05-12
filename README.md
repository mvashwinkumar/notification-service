# notification-service
This is node.js service template for use that can support multiple notification strategies and send database aggregation results based on pre-defined query configuration

## Query Configuration
Sample query configuration is defined in queries/sampleQuery.js. This can be used as a template to define new queries.

## Notification Strategies
Currently, following notification strategies are supported:
1. Log to console
2. Send email
3. Insert a record in database collection
4. Invoke a REST API POST endpoint

## Execution Types
Currently, following execution types are supported:
1. Execute query on a schedule
2. Execute query on demand
3. Execute query by watching a collection for changes